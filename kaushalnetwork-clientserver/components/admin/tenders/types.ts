export interface TenderData {
  tenderName: string;
  objective: string;
  modelNumber?: number;
  description: string;
  productsAndServicesRequired: string;
  aboutProductsAndServices: string;
  nomenclature: string;
  pricingCategory: 'PERUNIT' | 'MONTHLY';
  totalPrice: string;
  locationOfService: string;
  deliveryTerms: string;
  paymentTerms: string;
  otherConditions: string;
}

export interface TenderWithCompany extends TenderData {
  id: number;
  Company: {
    id: number;
    verified: boolean;
    companyName: string;
    companyType: string;
    logoUrl: string;
    entityType: string;
    businessType: string;
    sector: string;
    industry: string;
  };
}

export interface DetailedProposal {
  id: number;
  tenderId: number;
  proposedPrice: string;
  Company: {
    id: number;
    verified: boolean;
    companyName: string;
    companyType: string;
    logoUrl: string;
    entityType: string;
    businessType: string;
    sector: string;
    industry: string;
  };
}

export interface TenderDetail {
  id: number;
  tenderName: string;
  objective: string;
  description: string;
  productsAndServicesRequired: string;
  aboutProductsAndServices: string;
  nomenclature: string;
  pricingCategory: 'PERUNIT' | 'MONTHLY';
  locationOfService: string;
  deliveryTerms: string;
  paymentTerms: string;
  otherConditions: string;
  companyId: number;
  totalPrice: string;
  deleted: boolean;
}

export interface ProposalBasic {
  id: number;
  tenderId: number;
  proposedPrice: string;
}

// Helper function to get color based on pricing category
export function getPricingCategoryColor(category: 'PERUNIT' | 'MONTHLY') {
  switch (category) {
    case 'PERUNIT':
      return 'bg-purple-500';
    case 'MONTHLY':
      return 'bg-teal-500';
    default:
      return 'bg-gray-500';
  }
}
