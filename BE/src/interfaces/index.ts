export interface ICard {
  cardId: string;
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
  qty: number;
  card_image: {
    image_url: string;
    image_url_small: string;
    image_url_cropped: string;
  };
}
