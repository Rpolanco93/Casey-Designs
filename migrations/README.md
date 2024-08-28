# Migrations

To `clean`, `migrate`, or `generate` models use the utility called `migrate` located in this directory.

```shell
$ ./migrate 
Unsupported command: "migrate", "clean", and "models" are the only valid options
```

To migrate (create if not already created) the database and run all pending migrations
```shell
$ ./migrate migrate
```

To clean (delete) the database
```shell
$ ./migrate clean
```

To generate models

```shell
$ ./migrate models
```

Please see the `Requirements` section below prior to running.

## Requirements

### Migrations

This script makes use of flyway to perform migrations. Please download it using one of the following links options.
Open a terminal and navigate to `migrations/tools/bin`. Then paste the correct line. This will download and un-archive
it in one shot for you.

#### OSX

```shell
cd migrations/tools/bin
wget -qO- https://download.red-gate.com/maven/release/com/redgate/flyway/flyway-commandline/10.17.2/flyway-commandline-10.17.2-macosx-x64.tar.gz | tar -xvz
```

#### Linux

```shell
cd migrations/tools/bin
wget -qO- https://download.red-gate.com/maven/release/com/redgate/flyway/flyway-commandline/10.17.2/flyway-commandline-10.17.2-linux-x64.tar.gz | tar -xvz
```

Run `ls -l` and something similar as to what is below should be seen:

```shell
total 4
... flyway -> flyway-10.17.2
... flyway-10.17.2
```

### Models

The `generate.sh` utilities requires `GNU` versions of `sed`, `awk`, and `csplit`. These are the defaults when using
a debian based operating system. If this tool is going to be run from `OSX` the `GNU` versions can be installed via
`MacPorts` or `Brew`. Use one of the following commands:

#### MacPorts

```shell
sudo port install gsed gawk coreutils
```

#### Brew

```shell
brew install gnu-sed gawk coreutils
```

To generate models from the database the following required `pip` packages are needed as development dependencies:

```shell
pipenv install importanize --dev
pipenv install autoflake --dev
```