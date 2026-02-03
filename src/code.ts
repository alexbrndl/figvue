/// <reference types="@figma/plugin-typings" />

figma.showUI(__html__, { themeColors: true, width: 300, height: 200 });

figma.ui.onmessage = (msg: { type: string; count?: number; shape?: string }) => {
  if (msg.type === 'create-shapes') {
    const nodes: SceneNode[] = [];

    for (let i = 0; i < (msg.count || 1); i++) {
      let shape;

      if (msg.shape === 'rectangle') {
        shape = figma.createRectangle();
      } else if (msg.shape === 'triangle') {
        shape = figma.createPolygon();
      } else {
        shape = figma.createEllipse();
      }

      shape.x = i * 150;
      shape.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
      figma.currentPage.appendChild(shape);
      nodes.push(shape);
    }

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  figma.closePlugin();
};
