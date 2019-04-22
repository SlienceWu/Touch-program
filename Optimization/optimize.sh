#!/bin/bash

sudo cp config/run.sh /home/pi/printer/config/
sudo chmod +x /home/pi/printer/config/run.sh

# nanodlp service
sudo cp config/nanodlp.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable nanodlp

# touchscreen service
sudo rm -f /etc/rc.local*
sudo cp config/touchdlp.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable touchdlp

# timesync service
sudo cp config/systemd-timesyncd.service /etc/systemd/system/sysinit.target.wants/
sudo systemctl daemon-reload
sudo systemctl enable systemd-timesyncd


