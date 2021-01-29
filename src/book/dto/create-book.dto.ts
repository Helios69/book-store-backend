export class CreateBookDto {
  name: string;
  description: string;
  cover?: string;
  author: string;
  price: number;
  inStock?: boolean;
}
