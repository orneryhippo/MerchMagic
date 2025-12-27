
export interface ProductType {
  id: string;
  name: string;
  category: 'Apparel' | 'Drinkware' | 'Accessories';
  defaultPrompt: string;
  thumbnail: string;
}

export interface MockupState {
  originalLogo: string | null;
  currentMockup: string | null;
  history: string[];
  isLoading: boolean;
  error: string | null;
}

export enum EditMode {
  PLACEMENT = 'PLACEMENT',
  EDITING = 'EDITING'
}
