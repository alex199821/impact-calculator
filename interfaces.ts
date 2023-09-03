export interface Impact {
  impactData: {
    title: string;
    icons: string[];
    color: string;
    normalizedImpact: number;
    chartGroup?: string | null;
    impactUnit: string;
    impactDP: number;
    showFullYear?: boolean;
    equivalentDesc: string;
    normalizedEquivalent?: number;
    fixedEquivalent?: number;
    equivalentUnit?: string;
    equivalentIcon?: string;
  };
}

export interface HeroStateUpdate {
  typeSwithcerIsOnTop: boolean;
  handleHeroState?: (value: boolean) => void;
}

export interface CumulatedImpactUpdate {
  cumulatedImpactSelected: boolean;
  updateCumulatedImpact?: (value: boolean) => void;
}

export interface InvestAmount {
  investAmount: number;
  updateInvestAmount?: (amount: number) => void;
}

export interface ModalStateManagement {
  investmentModalOpen: boolean;
  handleInvestmentModal: (value: boolean) => void;
}

export interface DateManagement {
  calculationStartDate: Date;
  setNewDate?: (prop: Date) => void;
}

export interface DatePickerModalProps {
  handleDateSelect: (prop: Date | undefined) => void;
  defaultMonth: Date;
  selected: Date;
  closeDatePickerModal: () => void;
}

export interface ImpactCardListProps
  extends CumulatedImpactUpdate,
    InvestAmount,
    DateManagement {}
export interface ImpactCardProps extends Impact, InvestAmount, DateManagement {}
export interface InvestmentModalProps
  extends InvestAmount,
    ModalStateManagement {}
export interface DataInputProps
  extends InvestAmount,
    CumulatedImpactUpdate,
    DateManagement,
    HeroStateUpdate {}
export interface HeroProps extends CumulatedImpactUpdate, HeroStateUpdate {}
// export interface DatePickerModalProps extends {};
