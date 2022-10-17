#!/usr/bin/env ruby

require 'json'
require 'fileutils'
require 'digest'

FPS = 30
INTRO_DURATION = 4 * FPS
ARTWORK_DURATION = 4 * FPS

PUBLIC_DIR = "public"
OUTPUT_SUBDIR = "slideshow"
OUTPUT_DIR = "#{PUBLIC_DIR}/#{OUTPUT_SUBDIR}"

FileUtils.mkdir_p OUTPUT_DIR

duration_in_frames = 0

artworks = Dir["#{ARGV[0]}/**/*"].shuffle.map do |path|
  next unless [".png", ".jpg", ".jpeg"].include?(File.extname(path).downcase)
  character_configuration, artist_configuration = path.split(File::SEPARATOR)[-3..-2]

  _, character_name, character_species =
    character_configuration.match(/([^(]+) *\(?([^\)]+)?\)?/).to_a

  _, artist_name, artist_network =
    artist_configuration.match(/([^()]+) *\(?([^\)]+)?\)?/).to_a

  hash = Digest::SHA1.hexdigest(character_configuration + artist_configuration + File.basename(path))
  url = "#{OUTPUT_SUBDIR}/#{hash}#{File.extname(path)}"
  FileUtils.cp path, "#{PUBLIC_DIR}/#{url}"

  artwork = {
    characterName: character_name.strip.capitalize,
    species: character_species&.strip,
    artistName: artist_name.strip.capitalize,
    network: artist_network&.strip&.gsub(/https?_--/, '')&.gsub('-', '/'),
    url: url,
    durationInFrames: ARTWORK_DURATION,
    from: duration_in_frames
  }

  duration_in_frames += ARTWORK_DURATION

  artwork
end.compact


$stdout.write(
  JSON.pretty_generate({
    artworks: artworks,
    fps: FPS,
    from: 0,
    durationInFrames: duration_in_frames,
    introDurationInFrames: INTRO_DURATION,
  })
)
