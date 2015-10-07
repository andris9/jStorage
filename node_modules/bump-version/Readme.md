
# bump

  Easily bump the version of all the different package.json equivalents.

## Installation

    $ npm install -g ianstormtaylor/bump

## Usage

    $ bump 0.4.1

        Version bumped to 0.4.1 in package.json and component.json.

    $ bump patch

        Version bumped to 0.4.2 in package.json and component.json.

    $ bump minor

        Version bumped to 0.5.0 in package.json and component.json.

    $ bump major

        Version bumped to 1.0.0 in package.json and component.json.

## API

#### bump(root, version, manifests)

  Bump to `version` in `root`, an optional array of `manifests` can be provided.

    bump('/path/to/pkg', '0.3.1');
    bump('/path/to/pkg', 'patch');
    bump('/path/to/pkg', 'minor');
    bump('/path/to/pkg', 'major', ['package.json']); // only package.json


## License

  MIT
