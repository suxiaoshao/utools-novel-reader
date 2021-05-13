import { TotalData } from 'data';
import {Chapter} from "../web/novelInfo";

export const totalData: { data?: TotalData } = {};

export interface ReadRecord {
  author: string;
  name: string;
  chapter: Chapter;
  mainPageUrl: string;
  novelId: string;
}