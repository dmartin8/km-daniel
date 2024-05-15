export interface Campaign {
    id?: number;
    name: string;
    startDate: string;
    endDate: string;
    budget: number;
  }
  
  export type DateRange = [string, string];
  
  export interface CampaignsContainerProps {
    initialCampaigns: Campaign[];
  }