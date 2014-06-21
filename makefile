.PHONY: install start

install:
	bundle install

start:
	rake db:create
	rake db:migrate
	rails s
