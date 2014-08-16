# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "Ubuntu precise 64 VirtualBox"
  config.vm.box_url = "http://files.vagrantup.com/precise64.box"
  config.vm.hostname = "nodejs-redis-poll-example"
  config.vm.network "forwarded_port", guest: 80, host: 8001
  config.vm.network "forwarded_port", guest: 3000, host: 3000
  config.vm.network "forwarded_port", guest: 8080, host: 8080
  config.vm.network "forwarded_port", guest: 9000, host: 9000
  config.vm.network "private_network", ip: "192.168.123.45"
  config.ssh.forward_agent = true
  config.vm.synced_folder ".", "/home/vagrant/src"

  config.vm.provider "virtualbox" do |vb|
    vb.gui = false
    vb.customize ["modifyvm", :id, "--memory", "1024"]
  end

  $script = <<EOF
sudo apt-get update
sudo apt-get install build-essential git libncurses-dev tcl8.5-dev nginx -y
echo "Installing redis-2.8.13..."
wget http://download.redis.io/releases/redis-2.8.13.tar.gz
tar zxf redis-2.8.13.tar.gz
cd redis-2.8.13
make
make install
sed -i "/read -p/d" utils/install_server.sh
sed -i "/read  -p/d" utils/install_server.sh
sudo utils/install_server.sh
echo "Installing node-v0.10.30..."
cd
wget http://nodejs.org/dist/v0.10.30/node-v0.10.30-linux-x64.tar.gz
tar zxf node-v0.10.30-linux-x64.tar.gz
sudo mv node-v0.10.30-linux-x64 /opt/
sudo ln -s /opt/node-v0.10.30-linux-x64 /opt/nodejs
echo "export PATH=\$PATH:/opt/nodejs/bin" | sudo tee /etc/profile.d/nodejs.sh
. /etc/profile.d/nodejs.sh
echo "Configuring the project server..."
cd /home/vagrant/src/server
export NODE_ENV="production"
sudo /opt/nodejs/bin/npm install -g forever
npm install
echo "Configuring the project client..."
sudo cp -rf /home/vagrant/src/client/dist/* /usr/share/nginx/www/
echo "Starting..."
forever start server.js
sudo service nginx start
echo "Done!"
EOF
  config.vm.provision :shell, :inline => $script
  
end
