# SETUP #

- put everything in this directory (exluding this readme file) in either `/var/www/html` or `/var/www/html/nextcloud` notsure how the nextcloud server is setup
- locate DirectoryIndex in the Apache server config, probably called `.htaccess` or `httpd.conf` and check the `index.html` file has the follwing
```
<Directory /var/www/html>
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
    DirectoryIndex index.html index.php
</Directory>
```

### NOTES ###

- ray ID is randomly generated everytime the window refreshes
- redirect link is set to `https://nextcloud.inecdote.com/index.php/login`
- api requests may be blocked by users browser because we dont have the CORS plan, work around for this would be to make our own api route that we call (which can then call the ipgeolocation apis) 
