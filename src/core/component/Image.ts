import { Component } from "./Component";

export class Image extends Component {
  readonly type? = "Image";
  path?: string;
  slicePosition?: { x: number; y: number } = { x: 0, y: 0 };
  sliceShape?: { width: number; height: number };
  shape?: { width: number; height: number };
  constructor(image?: Image) {
    super(image);
    if (image) {
      if (image.path) this.path = image.path;
      if (image.shape) this.shape = image.shape;
      if (image.sliceShape) this.sliceShape = image.sliceShape;
      if (image.slicePosition) this.slicePosition = image.slicePosition;
    }
  }
}
