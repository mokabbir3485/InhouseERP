using DbExecutor;
using SecurityDAL;
using SecurityEntity.SECURITY.SecurityBLL;

namespace SecurityBLL
{
    public static class Facade
    {
        public static ad_BranchTypeBLL BranchType { get { return new ad_BranchTypeBLL(); } }
        public static ad_BranchGroupBLL BranchGroup { get { return new ad_BranchGroupBLL(); } }
        public static ad_BranchBLL Branch { get { return new ad_BranchBLL(); } }
        public static ad_BondBLL ad_BondBLL { get { return new ad_BondBLL(); } }
        public static ad_FiscalYearBLL ad_FiscalYearBLL { get { return new ad_FiscalYearBLL(); } }
        public static ad_ItemCategoryBLL ItemCategory { get { return new ad_ItemCategoryBLL(); } }
        public static ad_ItemUnitBLL ItemUnit { get { return new ad_ItemUnitBLL(); } }
        public static ad_UnitConversionBLL UnitConversion { get { return new ad_UnitConversionBLL(); } }
        public static s_RoleBLL Role { get { return new s_RoleBLL(); } }
        public static ad_SupplierBLL Supplier { get { return new ad_SupplierBLL(); } }
        public static ad_SupplierAddressBLL SupplierAddress { get { return new ad_SupplierAddressBLL(); } }
        public static ad_SupplierBillPolicyBLL SupplierBillPolicy { get { return new ad_SupplierBillPolicyBLL(); } }
        public static ad_TypeWiseBranchDAO TypeWiseBranch { get { return new ad_TypeWiseBranchDAO(); } }
        public static ad_AssetNatureBLL AssetNature { get { return new ad_AssetNatureBLL(); } }
        public static ad_AdditionalAttributeBLL AdditionalAttribute { get { return new ad_AdditionalAttributeBLL(); } }
        public static ad_DepartmentTypeBLL DepartmentType { get { return new ad_DepartmentTypeBLL(); } }
        public static ad_ItemSubCategoryTypeBLL ItemSubCategoryType { get { return new ad_ItemSubCategoryTypeBLL(); } }
        public static ad_ItemStateBLL ItemState { get { return new ad_ItemStateBLL(); } }
        public static ad_DomainBLL Domain { get { return new ad_DomainBLL(); } }
        public static ad_ItemSubCategoryBLL ItemSubCategory { get { return new ad_ItemSubCategoryBLL(); } }
        public static s_UserBLL User { get { return new s_UserBLL(); } }
        public static s_ModuleBLL Module { get { return new s_ModuleBLL(); } }
        public static ad_DepartmentBLL Department { get { return new ad_DepartmentBLL(); } }
        public static ad_ItemBLL Item { get { return new ad_ItemBLL(); } }
        public static ad_CancelProcessBLL ad_CancelProcessBLL { get { return new ad_CancelProcessBLL(); } }
        public static ad_ItemAdditionalAttributeBLL ItemAdditionalAttribute { get { return new ad_ItemAdditionalAttributeBLL(); } }
        public static ad_ItemAdditionalAttributeValueBLL ItemAdditionalAttributeValue { get { return new ad_ItemAdditionalAttributeValueBLL(); } }
        public static ad_TypeWiseDepartmentBLL TypeWiseDepartment { get { return new ad_TypeWiseDepartmentBLL(); } }
        public static ad_ItemWiseItemStateBLL ItemWiseItemState { get { return new ad_ItemWiseItemStateBLL(); } }
        public static s_ScreenBLL Screen { get { return new s_ScreenBLL(); } }
        public static s_PermissionBLL Permission { get { return new s_PermissionBLL(); } }
        public static s_PermissionDetailBLL PermissionDetail { get { return new s_PermissionDetailBLL(); } }
        public static ad_DesignationBLL Designation { get { return new ad_DesignationBLL(); } }
        public static ad_EmployeeBLL Employee { get { return new ad_EmployeeBLL(); } }
        public static ad_PriceTypeBLL PriceType { get { return new ad_PriceTypeBLL(); } }
        public static ad_TerminalBLL Terminal { get { return new ad_TerminalBLL(); } }
        public static ad_LoginLogoutLogBLL LoginLogoutLog { get { return new ad_LoginLogoutLogBLL(); } }
        public static ad_ItemPriceBLL ItemPrice { get { return new ad_ItemPriceBLL(); } }
        public static ad_ItemChargeBLL ItemCharge { get { return new ad_ItemChargeBLL(); } }
        public static ad_ChargeTypeApplyBLL ChargeTypeApply { get { return new ad_ChargeTypeApplyBLL(); } }
        public static ad_TransactionTypeBLL TransactionType { get { return new ad_TransactionTypeBLL(); } }
        public static s_ScreenLockBLL ScreenLock { get { return new s_ScreenLockBLL(); } }
        public static ad_ChargeTypeBLL ChargeType { get { return new ad_ChargeTypeBLL(); } }
        public static ad_OverHeadBLL OverHead { get { return new ad_OverHeadBLL(); } }
        public static ad_ItemUnitPackageBLL ItemUnitPackage { get { return new ad_ItemUnitPackageBLL(); } }
        public static error_LogBLL ErrorLog { get { return new error_LogBLL(); } }
        public static ad_ItemAssemblyBLL ItemAssembly { get { return new ad_ItemAssemblyBLL(); } }
        public static ad_ItemWiseSupplierBLL ItemWiseSupplier { get { return new ad_ItemWiseSupplierBLL(); } }
      
        public static ad_RequisitionPurposeBLL RequisitionPurpose { get { return new ad_RequisitionPurposeBLL(); } }
        public static ad_ReturnReasonBLL ReturnReason { get { return new ad_ReturnReasonBLL(); } }
        public static ad_StockAuditGroupBLL StockAuditGroup { get { return new ad_StockAuditGroupBLL(); } }
        public static ad_StockAuditTypeBLL StockAuditType { get { return new ad_StockAuditTypeBLL(); } }
        public static ad_ValuationTypeBLL ValuationType { get { return new ad_ValuationTypeBLL(); } }
        public static ad_AdvancedSearchPropertyBLL AdvancedSearchProperty { get { return new ad_AdvancedSearchPropertyBLL(); } }
        public static ad_SupplierTypeBLL SupplierType { get { return new ad_SupplierTypeBLL(); } }
        public static ad_AdditionalAttributeValueBLL AdditionalAttributeValue { get { return new ad_AdditionalAttributeValueBLL(); } }
        public static ad_StockMovementMethodBLL StockMovementMethod { get { return new ad_StockMovementMethodBLL(); } }
        public static s_ScreenDetailBLL ScreenDetail { get { return new s_ScreenDetailBLL(); } }
        public static ad_ApprovalBLL Approval { get { return new ad_ApprovalBLL(); } }
        public static ad_PaymentGroupBLL ad_PaymentGroup { get { return new ad_PaymentGroupBLL(); } }
        public static ad_PaymentTypeBLL ad_PaymentType { get { return new ad_PaymentTypeBLL(); } }
        public static s_UserDepartmentBLL s_UserDepartment { get { return new s_UserDepartmentBLL(); } }
        public static ad_BankBLL ad_Bank { get { return new ad_BankBLL(); } }
        public static ad_BankAccountBLL ad_BankAccount { get { return new ad_BankAccountBLL(); } }
        public static ad_BankDocumentEntryBLL ad_BankDocumentEntryBLL { get { return new ad_BankDocumentEntryBLL(); } }
        public static ad_NoticeBLL ad_Notice { get { return new ad_NoticeBLL(); } }
        public static ad_NoticeDetailBLL ad_NoticeDetail { get { return new ad_NoticeDetailBLL(); } }
        public static ad_ItemPriceByAttributeBLL ad_ItemPriceByAttribute { get { return new ad_ItemPriceByAttributeBLL(); } }
        public static ad_CompanyBLL CompanyBLL { get { return new ad_CompanyBLL(); } }
        public static ad_CompanyAddressBLL CompanyAddressBLL { get { return new ad_CompanyAddressBLL(); } }
        public static ad_CompanyBillPolicyBLL CompanyBillPolicyBLL { get { return new ad_CompanyBillPolicyBLL(); } }
        public static ad_CompanyTypeBLL CompanyTypeBLL { get { return new ad_CompanyTypeBLL(); } }
        public static ad_BankAccountBLL BankAccountBLL { get { return new ad_BankAccountBLL(); } }
        public static ad_SectionBLL ad_SectionBLL { get { return new ad_SectionBLL(); } }
        public static ad_ItemHsCodeBLL ItemHsCode { get { return new ad_ItemHsCodeBLL(); } }
        public static ad_DepartmentWiseSectionBLL ad_DepartmentWiseSection { get { return new ad_DepartmentWiseSectionBLL(); } }
        public static Rpt_MonthYearBLL Rpt_MonthYear { get { return new Rpt_MonthYearBLL(); } }
        public static s_ReportNotificationDetailBLL s_ReportNotificationDetailBLL { get { return new s_ReportNotificationDetailBLL(); } }
        public static ad_StockDeclarationTypeBLL StockDeclarationType { get { return new ad_StockDeclarationTypeBLL(); } }
        public static ad_MatrialTypeBLL ad_MatrialType { get { return new ad_MatrialTypeBLL(); } }
        public static ad_EmailNotificationSetupBLL ad_EmailNotificationSetupBLL { get { return new ad_EmailNotificationSetupBLL(); } }
        public static s_SystemNotificationBLL s_SystemNotificationBLL { get { return new s_SystemNotificationBLL(); } }
        public static ad_LabelBrandBLL ad_LabelBrandBLL { get { return new ad_LabelBrandBLL(); } }
        public static ad_AdvanceToEmployeeBLL ad_AdvanceToEmployeeBLL { get { return new ad_AdvanceToEmployeeBLL(); } }
        public static ad_FactoryExpensesBLL ad_FactoryExpensesBLL { get { return new ad_FactoryExpensesBLL(); } }
    }
}