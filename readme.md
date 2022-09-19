## Information

This readme is a work in progress. It will be updated as the project progresses.

# Project Description

I couldnt find a consolidated place that gave me all the information I needed to to get a Raspberry PI up and running with an Express server. So I decided to make one.

This project will be a step by step guide to getting a Raspberry PI up and running with an Express server including socketio. The eventual goal is to have a Raspberry PI that can be accessed from anywhere in the world and can be used to control gpio pins.

For this project I will be using the following:

- [Raspberry PI 4 Model B](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/)
- [Express](https://expressjs.com/)
- [Socket.io](https://socket.io/)
  - The idea is to use socket.io to send and receive data from the Raspberry PI to another server. This will allow the client to control the gpio pins on the Raspberry PI. Without having to deal with router port forwarding and other issues that come with trying to access a Raspberry PI from the internet.
- [PM2](https://pm2.keymetrics.io/)
  - This is a process manager for Node.js applications. It will allow me to keep the Express server running even if I close the terminal.
- [Nginx](https://www.nginx.com/)
  - Nginx will be used as a reverse proxy to allow for http/https connections.

# Pi Setup

Download and install Pi Imager from https://www.raspberrypi.org/software/

## Install Raspbian

- Insert an SD card into your computer.
- Open Pi Imager and select Raspbian as the operating system.
- Select the SD card as the target.
- Click the settings icon.
  - Select the "Advanced Options" tab.
- Click "Write".

Select the SD card as the storage device. Click "Write". Wait for the image to be written to the SD card.

Using Pi Imager, install Raspbian to the SD card.

Download the Refer to the Raspi website to install the os on a SD Card. https://www.raspberrypi.com/documentation/computers/getting-started.html

Here is a great step by step https://www.tomshardware.com/how-to/set-up-raspberry-pi

<p align="center">
  <img src="https://cdn.mos.cms.futurecdn.net/3rPEmh2KB54z334tZ6xcRS-1200-80.png" width="350" alt="accessibility text">
</p>

## Set Hostname

Either leave as the default `raspberrypi` or change the name. But remember this for later, we will need it to get the ip of the server.

## Enable SSH

Ensure `Enable SSH` is checked and `Use password authentication` is selected.

## Set Username and Password

Ensure `Set username and password` is selected and remember these for later. These creds will be used to login via SSH.

name the pi and set the password

## Get the pi's IP address

Using the `Hostname` you set earlier, you can get the IP address of the pi. This will be used to login via SSH.

`Local Computer`

```bash
ping -c 1 {{HOSTNAME}}.local | grep -oE "\b([0-9]{1,3}\.){3}[0-9]{1,3}\b" | head -1
```

Example:

```bash
ping -c 1 raspberrypi.local | grep -oE "\b([0-9]{1,3}\.){3}[0-9]{1,3}\b" | head -1
```

## Login via SSH

Using the `Hostname` and `Username` and `Password` you set earlier, you can login via SSH.

`Local Computer`

```bash
ssh {{USERNAME}}@{{IP_ADDRESS}}
```

It will prompt you for the password. Enter the password you set earlier.

If you have previously connected to the pi, you may need to remove the old key from the known hosts file.

`Local Computer`

```bash
ssh-keygen -R {{IP_ADDRESS}}
```

## Update the OS

`Pi via SSH`

```bash
sudo apt-get update
sudo apt-get upgrade
```

## Install NodeJS and NPM

`Pi via SSH`

```bash
sudo apt-get install nodejs
sudo apt-get install npm
```

## Update NodeJS and NPM

`Pi via SSH`

```bash
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```

## Check NodeJS and NPM versions

`Pi via SSH`

```bash
node -v
npm -v
```

## Install Git

`Pi via SSH`

```bash
sudo apt-get install git
```

## Clone the repo

Navigate to the directory you want to clone the repo to and run the following command. `Pi via SSH`

```bash
git clone https://github.com/widgetdude/node-pi-server.git
```

Change into the directory `Pi via SSH`

```bash
cd node-pi-server
```

## Install the dependencies

`Pi via SSH`

```bash
npm install
```

## Run the server

`Pi via SSH`

```bash
npm start
```

## Install PM2 and Nginx

```bash
sudo npm install pm2 -g
sudo apt-get install nginx
```

## Make PM2 start on boot

```bash
pm2 startup systemd
```

It will output a command to run. Copy and paste that command into the terminal. e.g.

```bash
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u pi --hp /home/pi
```

## Make Nginx start on boot

```bash
sudo systemctl enable nginx
```

## Edit Nginx config

There are quite a few ways to do this. I prefer editing the file directly using vscode. You can also use nano or vim.

### vscode

#### Change the permissions of the file to allow editing

On the pi, run the following command.

```bash
sudo chmod 777 /etc/nginx/sites-available/default
```

#### Open the file

Install the extension `Remote - SSH` and then connect to the pi. This will open a new vscode window with the pi as the root folder. Navigate to the /etc/nginx dir and open it in the editor. Once the directory is open, open the `sites-available` directory and then open the `default` file.

#### Edit the file

This essentially just adds a new server block to the file. You can copy and paste the following into the file. It will redirect all traffic to the pi to the port 3000. This is where our app will be running.

Replace the contents of the file with the following:

```bash
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/html;

    index index.html index.htm index.nginx-debian.html;

    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Be sure to save the file.

#### Change the permissions of the file back to normal

On the pi, run the following command.

```bash
sudo chmod 644 /etc/nginx/sites-available/default
```
