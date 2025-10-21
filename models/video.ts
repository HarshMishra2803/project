import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

export const VIDEO_DIMENSIONS = {
  width: 1080,
  heigth: 1920,
} as const;

export interface Ivideo {
  _id?: mongoose.Types.ObjectId;
  title: string;
  discription: string;
  videoUrl: string;
  thumbnailUrl: string;
  controls?: boolean;
  transformations?: {
    height: number;
    width: number;
    quality?: number;
  };
}

const videoSchema = new Schema<Ivideo>(
  {
    title: {
      type: String,
      required: true,
    },
    discription: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    controls: {
      type: Boolean,
      default: true,
    },
    transformations: {
      height: {
        type: Number,
        required: false,
        default: VIDEO_DIMENSIONS.heigth,
      },
      width: {
        type: Number,
        required: false,
        default: VIDEO_DIMENSIONS.width,
      },
      quality: {
        type: Number,
        min: 1,
        max: 100,
      },
    },
  },
  {
    timestamps: true, // created at updated at
  }
); 
const video = models?.video || model<Ivideo>("video", videoSchema);
export default video;


