## Information

## Install the OS

Refer to the Raspi website to install the os on a SD Card. https://www.raspberrypi.com/documentation/computers/getting-started.html

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

```bash
ping -c 1 {{HOSTNAME}}.local | grep -oE "\b([0-9]{1,3}\.){3}[0-9]{1,3}\b" | head -1
```

Example:

```bash
ping -c 1 raspberrypi.local | grep -oE "\b([0-9]{1,3}\.){3}[0-9]{1,3}\b" | head -1
```

## Login via SSH

Using the `Hostname` and `Username` and `Password` you set earlier, you can login via SSH.

```bash
ssh {{USERNAME}}@{{IP_ADDRESS}}
```

It will prompt you for the password. Enter the password you set earlier.

If you have previously connected to the pi, you may need to remove the old key from the known hosts file.

```bash
ssh-keygen -R {{IP_ADDRESS}}
```

## Update the OS

```bash
sudo apt-get update
sudo apt-get upgrade
```

## Install NodeJS and NPM

```bash
sudo apt-get install nodejs
sudo apt-get install npm
```

## Update NodeJS and NPM

```bash
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```

## Check NodeJS and NPM versions

```bash
node -v
npm -v
```

## Install Git

```bash
sudo apt-get install git
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
