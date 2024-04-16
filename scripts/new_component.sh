#!/bin/sh

nx g @nx/react:library view-three --directory=libs/view/three --allPrompts

nx g @nx/react:component libs/view/three/src/lib/three-rectangle
nx g @nx/react:component-story --componentPath=./lib/three-rectangle.tsx --project=view-three --verbose


nx g @nx/react:component libs/view/three/src/lib/three-ellipse
nx g @nx/react:component-story --componentPath=./lib/three-ellipse.tsx --project=view-three --verbose

nx g @nx/react:component libs/view/three/src/lib/three-line
nx g @nx/react:component-story --componentPath=./lib/three-line.tsx --project=view-three --verbose
