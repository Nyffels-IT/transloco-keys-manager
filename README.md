# Transloco keys manager with extra functionality

## Fork
This is a fork of jsverse/transloco-keys-manager. You can fellow the original documentation on their README page (https://github.com/jsverse/transloco-keys-manager). 
This README will only contain the newer functions and parameters.

* workdir parameter to set a workdir for this application. 
* default value to a in-code translation string. Ideal for solo developers of small teams to set a base language and create a better readability to their translation tags. 

## Instalation 
```bash
npm install @nyffels/transloco-keys-manager
```

## configuration parameters

### workdir

```bash
transloco-keys-manager extract --workdir dir\to\path
```

##### Config file
workdir: string

##### Default
Directory where the application has been launched from. 

##### Usage 
Set the working directory for this parameter

### default-language

```bash
transloco-keys-manager extract --default-language nl
```

##### Config file
defaultLanguage: string

##### Default
en

##### usage 
Set the default language for the default values set in code (optional). These default values will only be set for the given language. The other language files will listen to the original "default-value" parameter. If defaultValue option in code is left empty or null, then the "default-value" will be used as a fallback value.

## Functions

### marker
* This marker function is an expansion on the default marker function. It allows the user to add a default value string in code for the default language set in the settings. 