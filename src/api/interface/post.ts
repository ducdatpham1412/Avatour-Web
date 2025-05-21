export interface TypeItemPost {
  id: string;
  project: string;
  topic: string;
  idea: string;
  context: string;
  total_duration: number;
  content: Array<{
    title: string;
    duration: number;
    illustrations: Array<{
      image: string;
      image_urls: string[];
      image_selected: string;
      animation: string;
      animation_urls: string[];
      animation_selected: string;
    }>;
    voice: string;
  }>;
  voice_urls: string[];
  created: string;
  status: 'active' | 'rendering-img' | 'rendered-img';
}
