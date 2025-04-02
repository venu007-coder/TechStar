<?php
define('WP_AUTO_UPDATE_CORE', 'minor');// This setting is required to make sure that WordPress updates can be properly managed in WordPress Toolkit. Remove this line if this WordPress website is not managed by WordPress Toolkit anymore.
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'admin_als' );

/** MySQL database username */
define( 'DB_USER', 'als' );

/** MySQL database password */
define( 'DB_PASSWORD', 'altechstar@123' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost:3306' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY', 'j-j:LTW(!wvl12R_42J1~)C:9c|&hG(5s5K--)LsJB9IR5@ZUuQ41*:74p1W]O0/');
define('SECURE_AUTH_KEY', '(7TTQr-Kr2m!1N45:0134yrdR4ODe%2L31Ss~Vn+iKGm!7Gm|H:07t46_aaX&8/1');
define('LOGGED_IN_KEY', 'ch)63p/7iyYq15Ujb@%g2gyShT@VcX2I+U9W4&H)fd9Z1!;:*#9[*1(sck3EC!H;');
define('NONCE_KEY', '18-WnPay/Dn]5]%j9i&0h:MClU(|4Z@Dw+:qMJ*28;-e;|G0Z_X%]cYE6U(q5!S9');
define('AUTH_SALT', 'Hh3M228jo|Mi)2N[[]LhT-Vs4DM6Sm7)f3hQFDyB2z#ed4sR858l-62GE!aFE+b5');
define('SECURE_AUTH_SALT', 'l[7+)DKqV9P&Gwn4LmWj*XfaJ3/0:57171bV[N3t2l4;&i8jYv-+-ak89#d;8)00');
define('LOGGED_IN_SALT', 'K3%z:9#*c8vAYi_5&5M4qMGict@%w:442~%Yy-222jKQX[cg50v!;ZC7etOW)_7@');
define('NONCE_SALT', 's74wD-j54D)OhFSPqo~x7z7-M;s78R@&qybTQ0[4;#5MaYY258Cn88n4k(T5%PG[');

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'nPr7vGz_';


define('WP_ALLOW_MULTISITE', true);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) )
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

define('DISALLOW_FILE_EDIT', true);
define('DISALLOW_FILE_MODS', true);