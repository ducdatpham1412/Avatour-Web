interface TypeApi<T> {
  success: boolean;
  data: T;
}

type TypePrice = {
  number_people: number;
  price: number;
};
