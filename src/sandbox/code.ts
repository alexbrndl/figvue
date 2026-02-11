/// <reference types="@figma/plugin-typings" />
import type { PluginMessage } from '../types';

figma.showUI(__html__, { themeColors: true, width: 300, height: 200 });

figma.ui.onmessage = (msg: unknown) => {
  const message = msg as PluginMessage;

  if (message.type === 'create-shapes') {
    const nodes: SceneNode[] = [];

    for (let i = 0; i < message.count; i++) {
      let shape: RectangleNode | EllipseNode | PolygonNode;

      if (message.shape === 'rectangle') {
        shape = figma.createRectangle();
      } else if (message.shape === 'ellipse') {
        shape = figma.createEllipse();
      } else {
        shape = figma.createPolygon();
      }

      shape.x = i * 150;
      shape.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
      figma.currentPage.appendChild(shape);
      nodes.push(shape);
    }

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
    figma.closePlugin();
  }

  if (message.type === 'cancel') {
    figma.closePlugin();
  }
};
