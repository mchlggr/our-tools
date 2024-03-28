# File Structure 

This file is a guild to the overall file structure of the Penumbra graphics editing modules

- storage
	- shared
	- ui
	- s3
	- local
	- dropbox
- document
	- shared
	- world
	- piece
	- surface
	- line
	- rect
	- ellipse
	- polygon
- editor- Contains an implementation of multi-methods
	- shared
  - methods
  - 
- tool
	- shared
	- ui
	- select
	- rectangle
	- ellipse
	- line
	- text
	- path
	- polygon
- render
	- shared
	- svg
	- web-gl
	- web-xr Inherits from web-gl and extends it to support AR/VR
	- canvas Itmap Canvas
	- PDF Produces PostScript
	- HTML
 
