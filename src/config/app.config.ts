interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['HR Manager'],
  customerRoles: ['Customer'],
  tenantRoles: ['Owner', 'HR Manager', 'Employee'],
  tenantName: 'Organization',
  applicationName: 'HR Management Application',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'Manage personal customer information',
    'View organization information',
    'View employee information',
    'Contact HR manager',
  ],
  ownerAbilities: [
    'Manage user information',
    'Manage employee data',
    'Manage organization details',
    'Oversee HR Manager records',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/07b41ec5-017f-4950-a73e-4b00087254a9',
};
