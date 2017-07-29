require 'percy/capybara/anywhere'
ENV['PERCY_DEBUG'] = '1' # Enable debugging output.

# Configuration.
server = 'https://pink-pineapple.herokuapp.com'
assets_dir = File.expand_path('../public', __FILE__)
assets_base_url = '/'

Percy::Capybara::Anywhere.run(server, assets_dir, assets_base_url) do |page|
  page.visit('/')
  Percy::Capybara.snapshot(page, name: 'registry')

  page.visit('/oc-green-gorilla-app/~preview')
  Percy::Capybara.snapshot(page, name: 'oc-green-gorilla-app')

  page.visit('/oc-columbus-header/1.1.1/~info')
  Percy::Capybara.snapshot(page, name: 'oc-columbus-header')

  page.visit('/v2')
  Percy::Capybara.snapshot(page, name: 'v2')
end
