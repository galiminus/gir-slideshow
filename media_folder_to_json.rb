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

video_duration_in_frames = 0

characters = Dir["#{ARGV[0]}/**/*"].reduce({}) do |media, path|
  if [".png", ".jpg", ".jpeg"].include?(File.extname(path).downcase)
    character, artist_configuration = path.split(File::SEPARATOR)[-3..-2]

    media[character] ||= {}
    media[character][artist_configuration] ||= []
    media[character][artist_configuration] << path
  end

  media
end.map do |name, artists|
  character_duration_in_frames = 0

  _, character_name, character_species = name.match(/([^(]+) *\(?([^\)]+)?\)?/).to_a

  artists_configuration = artists.map do |artist_configuration, artworks|
    _, artist_name, artist_network = artist_configuration.match(/([^()]+) *\(?([^\)]+)?\)?/).to_a

    artist_duration_in_frame = 0

    artworks_configuration = artworks.map do |artwork|
      path = "#{OUTPUT_SUBDIR}/#{Digest::SHA1.hexdigest(artwork)}#{File.extname(artwork)}"
      FileUtils.cp artwork, "#{PUBLIC_DIR}/#{path}"

      artwork_configuration = {
        url: path,
        durationInFrames: ARTWORK_DURATION,
        from: artist_duration_in_frame
      }

      artist_duration_in_frame += ARTWORK_DURATION

      artwork_configuration
    end

    artist_configuration = {
      name: artist_name.strip.capitalize,
      durationInFrames: artist_duration_in_frame,
      from: character_duration_in_frames,
      network: artist_network&.strip&.gsub(/https?_--/, '')&.gsub('-', '/'),
      artworks: artworks_configuration
    }

    character_duration_in_frames += artist_duration_in_frame

    artist_configuration
  end

  character_configuration = {
    name: character_name.strip.capitalize,
    species: character_species&.strip,
    from: video_duration_in_frames,
    durationInFrames: character_duration_in_frames,
    artists: artists_configuration
  }

  video_duration_in_frames += character_duration_in_frames

  character_configuration
end

$stdout.write(
  JSON.pretty_generate({
    characters: characters,
    fps: FPS,
    from: 0,
    durationInFrames: video_duration_in_frames + INTRO_DURATION,
    introDurationInFrames: INTRO_DURATION,
  })
)
