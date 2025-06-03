export interface TResponseSuccess<T = null> {
  message: string;
  status: string;
  data: T;
}

export interface TResponseError {
  message: string;
  status: 'Error';
  data?: null;
  errors?: {
    [k: string]: string;
  };
}

export type TResponse<T = undefined> = TResponseSuccess<T> | TResponseError;

export type TFilterOperator =
   | 'ROMANCE'
   | 'HISTORICAL'
   | 'DETECTIVE'
   | 'SCIFI'
   | 'FANTASY'
   | 'PSYCHOLOGICAL'
   | 'POETRY'
   | 'BIOGRAPHY'
   | 'HISTORY'
   | 'SCIENCE'
   | 'PHILOSOPHY'
   | 'PSYCHOLOGY'
   | 'BUSINESS'
   | 'MYSTICISM'
   | 'TRAVEL'
   | 'COOKING'
   | 'FAIRY_TALES'
   | 'PRESCHOOL'
   | 'SCHOOL_AGE'
   | 'TEEN'
   | 'EDUCATIONAL_KIDS'
   | 'PRESCHOOL_EDU'
   | 'TEXTBOOKS'
   | 'MANUALS'
   | 'MOTIVATION'
   | 'HEALTH'
   | 'SELF_PSYCHOLOGY'
   | 'MEDICAL'
   | 'LAW'
   | 'TECHNICAL'
   | 'IT'
   | 'ARTS_CULTURE'

export type TAPIFilters<T> = {
  [K in keyof T]?: {
    [o in TFilterOperator]?: string;
  };
};

// Тип, який представляє ключі інтерфейсу TListMeta<T>.
export type TMetaParamsKeys = keyof TListMeta<any>;

export interface TListMeta<T> {
  page?: number; // Номер поточної сторінки
  size?: number; // Кількість елементів на сторінці
  sortBy?: string; // Сортування за спаданням desc або за зростанням asc
  title?: string; // Отримання даних за назвою
  author?: string; // Отримання даних за автором
  category?: string; // Отримання даних за категорією
  price?: number;  // Отримання даних за ціною
  languages?: string;  // Отримання даних за мовою
  subcategories?: TAPIFilters<T>; // Фільтри для даних
}
