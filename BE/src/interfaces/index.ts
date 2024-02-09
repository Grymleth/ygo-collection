export interface IYGOProDeckCard {
  id: string;
  name: string;
  type: string;
  frameType: string;
  desc: string;
  atk?: number;
  def?: number;
  level?: number;
  race: string;
  attribute?: string;
  archetype?: string;
  ygoprodeck_url: string;
  card_images: [
    {
      image_url: string;
      image_url_small: string;
      image_url_cropped: string;
    },
  ];
}
