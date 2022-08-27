<?php

// autoload_real.php @generated by Composer

class ComposerAutoloaderInitb0a91e3c8a345ad1fbd20bd6eb35ddda
{
    private static $loader;

    public static function loadClassLoader($class)
    {
        if ('Composer\Autoload\ClassLoader' === $class) {
            require __DIR__ . '/ClassLoader.php';
        }
    }

    /**
     * @return \Composer\Autoload\ClassLoader
     */
    public static function getLoader()
    {
        if (null !== self::$loader) {
            return self::$loader;
        }

        require __DIR__ . '/platform_check.php';

        spl_autoload_register(array('ComposerAutoloaderInitb0a91e3c8a345ad1fbd20bd6eb35ddda', 'loadClassLoader'), true, true);
        self::$loader = $loader = new \Composer\Autoload\ClassLoader(\dirname(__DIR__));
        spl_autoload_unregister(array('ComposerAutoloaderInitb0a91e3c8a345ad1fbd20bd6eb35ddda', 'loadClassLoader'));

        require __DIR__ . '/autoload_static.php';
        call_user_func(\Composer\Autoload\ComposerStaticInitb0a91e3c8a345ad1fbd20bd6eb35ddda::getInitializer($loader));

        $loader->register(true);

        $includeFiles = \Composer\Autoload\ComposerStaticInitb0a91e3c8a345ad1fbd20bd6eb35ddda::$files;
        foreach ($includeFiles as $fileIdentifier => $file) {
            composerRequireb0a91e3c8a345ad1fbd20bd6eb35ddda($fileIdentifier, $file);
        }

        return $loader;
    }
}

/**
 * @param string $fileIdentifier
 * @param string $file
 * @return void
 */
function composerRequireb0a91e3c8a345ad1fbd20bd6eb35ddda($fileIdentifier, $file)
{
    if (empty($GLOBALS['__composer_autoload_files'][$fileIdentifier])) {
        $GLOBALS['__composer_autoload_files'][$fileIdentifier] = true;

        require $file;
    }
}
