require 'percy/capybara/anywhere'
ENV['PERCY_DEBUG'] = '1' # Enable debugging output.

# Configuration.
server = 'https://pink-pineapple.herokuapp.com'
assets_dir = File.expand_path('../build', __FILE__)
assets_base_url = '/'

Percy::Capybara::Anywhere.run(server, assets_dir, assets_base_url) do |page|
  page.visit('/')
  Percy::Capybara.snapshot(page, name: 'registry')
end
