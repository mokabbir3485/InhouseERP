using DbExecutor;
using InventoryEntity;
using SecurityEntity.INVENTORY.InventoryEntity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.INVENTORY.InventoryDAL
{
    public class Vat_SupplierVdsIssueDAO
    {
        private static volatile Vat_SupplierVdsIssueDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public Vat_SupplierVdsIssueDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static Vat_SupplierVdsIssueDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new Vat_SupplierVdsIssueDAO();
                    }

                return instance;
            }
        }

        public static Vat_SupplierVdsIssueDAO GetInstance()
        {
            if (instance == null) instance = new Vat_SupplierVdsIssueDAO();
            return instance;
        }


        public int Add(Vat_VDS _VAT_VDSCertifications)
        {
            int ret = 0;
            try
            {
                var colparameters = new Parameters[24]
                {
                    new Parameters("@VDSIssueNo", _VAT_VDSCertifications.VDSIssueNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@VDSIssueDate", _VAT_VDSCertifications.VDSIssueDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@ChallanNo", _VAT_VDSCertifications.ChallanNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ChallanDate", _VAT_VDSCertifications.ChallanDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@Submitted_Bank", _VAT_VDSCertifications.Submitted_Bank,
                        DbType.String, ParameterDirection.Input),

                    new Parameters("@Bank_District", _VAT_VDSCertifications.Bank_District , DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Bank_Branch", _VAT_VDSCertifications.Bank_Branch, DbType.String, ParameterDirection.Input),
                    new Parameters("@CodeNo", _VAT_VDSCertifications.CodeNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@TotalVDSAmount", _VAT_VDSCertifications.TotalVDSAmount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", _VAT_VDSCertifications.Remarks, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@PayerBankAccountId", _VAT_VDSCertifications.PayerBankAccountId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PaymentTypeId", _VAT_VDSCertifications.PaymentTypeId, DbType.Int32,
                         ParameterDirection.Input),

                    new Parameters("@PaymentDate", _VAT_VDSCertifications.PaymentDate, DbType.DateTime,
                        ParameterDirection.Input),

                    new Parameters("@ChequeTypeId", _VAT_VDSCertifications.ChequeTypeId, DbType.Int32,
                        ParameterDirection.Input),

                    new Parameters("@ChequeNo", _VAT_VDSCertifications.ChequeNo, DbType.String,
                         ParameterDirection.Input),
                    new Parameters("@ChequeDate", _VAT_VDSCertifications.ChequeDate, DbType.DateTime,
                        ParameterDirection.Input),

                    new Parameters("@MobileBankingServiceId", _VAT_VDSCertifications.MobileBankingServiceId, DbType.Int32,
                        ParameterDirection.Input),

                   new Parameters("@TransactionNo", _VAT_VDSCertifications.TransactionNo, DbType.String,
                        ParameterDirection.Input),
                   new Parameters("@MobileNo", _VAT_VDSCertifications.MobileNo, DbType.String,
                        ParameterDirection.Input),
                   new Parameters("@MoneyReceiptNo", _VAT_VDSCertifications.MoneyReceiptNo, DbType.String,
                        ParameterDirection.Input),
                   new Parameters("@SubmittedBy", _VAT_VDSCertifications.SubmittedBy, DbType.Int32,
                        ParameterDirection.Input),
                   new Parameters("@SubmittedTo", _VAT_VDSCertifications.SubmittedTo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@PaidFor", _VAT_VDSCertifications.PaidFor, DbType.String,
                        ParameterDirection.Input),
                   new Parameters("@UpdatorId", _VAT_VDSCertifications.UpdatorId, DbType.Int32,
                        ParameterDirection.Input)
                };

                //ret = dbExecutor.ExecuteScalar32(CommandType.StoredProcedure, "Vat_VDS_Create",
                //    colparameters, true);
                //return ret;

                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "Vat_VDS_Create",
                    colparameters, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
            }
            catch (DBConcurrencyException except)
            {
                dbExecutor.ManageTransaction(TransactionType.Rollback);
                throw except;
            }
            catch (Exception ex)
            {
                dbExecutor.ManageTransaction(TransactionType.Rollback);
                throw ex;
            }

            return ret;
        }


        public int AddMushak6_6(vat_Mushak_6_6 _Mushak_6_6)
        {
            int ret = 0;
            try
            {
                var colparameters = new Parameters[5]
                {
                    new Parameters("@IssueNo", _Mushak_6_6.IssueNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IssueDate", _Mushak_6_6.IssueDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@SupplierId", _Mushak_6_6.SupplierId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@IssuedBy", _Mushak_6_6.IssuedBy, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _Mushak_6_6.UpdatorId,
                        DbType.Int32, ParameterDirection.Input),
                };

                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "vat_Mushak_6_6_Create",
                    colparameters, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
            }
            catch (DBConcurrencyException except)
            {
                dbExecutor.ManageTransaction(TransactionType.Rollback);
                throw except;
            }
            catch (Exception ex)
            {
                dbExecutor.ManageTransaction(TransactionType.Rollback);
                throw ex;
            }

            return ret;
        }

        public int AddMushakDetails6_6(vat_MushakDetails_6_6 _MushakDetils_6_6)
        {
            int ret = 0;
            try
            {
                var colparameters = new Parameters[9]
                {
                    new Parameters("@IssueId", _MushakDetils_6_6.IssueId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@TrChallanNo", _MushakDetils_6_6.TrChallanNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@TrChallanDate", _MushakDetils_6_6.TrChallanDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@PBId", _MushakDetils_6_6.PBId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@TotalBillAmount", _MushakDetils_6_6.TotalBillAmount,
                        DbType.Decimal, ParameterDirection.Input),
                     new Parameters("@TotalVATAmount", _MushakDetils_6_6.TotalVATAmount,
                        DbType.Decimal, ParameterDirection.Input),
                      new Parameters("@TotalVDSAmount", _MushakDetils_6_6.TotalVDSAmount,
                        DbType.Decimal, ParameterDirection.Input),
                       new Parameters("@IsLocal", _MushakDetils_6_6.IsLocal,
                        DbType.Boolean, ParameterDirection.Input),
                        new Parameters("@Remarks", _MushakDetils_6_6.Remarks,
                        DbType.String, ParameterDirection.Input),
                };

                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "vat_Mushak_6_6_Detail_Create",
                    colparameters, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
            }
            catch (DBConcurrencyException except)
            {
                dbExecutor.ManageTransaction(TransactionType.Rollback);
                throw except;
            }
            catch (Exception ex)
            {
                dbExecutor.ManageTransaction(TransactionType.Rollback);
                throw ex;
            }

            return ret;
        }

        public int AddDetails(Vat_VDSDetail _VatDetails)
        {
            int ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@VDSIssueId", _VatDetails.VDSIssueId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PBId", _VatDetails.PBId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@SupplierId", _VatDetails.SupplierId,
                        DbType.Int32, ParameterDirection.Input),
                    new Parameters("@VDSAmount", _VatDetails.VDSAmount , DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@PaidFor", _VatDetails.PaidFor, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsLocal", _VatDetails.IsLocal, DbType.Boolean, ParameterDirection.Input),

                };

                //ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "Vat_VDSDetail_Create",
                //    colparameters, true);
                //return ret;
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "Vat_VDSDetail_Create",
                    colparameters, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
            }
            catch (DBConcurrencyException except)
            {
                dbExecutor.ManageTransaction(TransactionType.Rollback);
                throw except;
            }
            catch (Exception ex)
            {
                dbExecutor.ManageTransaction(TransactionType.Rollback);
                throw ex;
            }

            return ret;
        }

        public List<Vat_VDS> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
           string sortOrder, ref int rows)
        {
            try
            {
                var VAT_VDSCertificationsLst = new List<Vat_VDS>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                VAT_VDSCertificationsLst = dbExecutor.FetchDataRef<Vat_VDS>(CommandType.StoredProcedure,
                    "Vat_VDS_GetPaged", colparameters, ref rows);
                return VAT_VDSCertificationsLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<vat_Mushak_6_6> Musuk_6_GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
           string sortOrder, ref int rows)
        {
            try
            {
                var VAT_VDSCertificationsLst = new List<vat_Mushak_6_6>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                VAT_VDSCertificationsLst = dbExecutor.FetchDataRef<vat_Mushak_6_6>(CommandType.StoredProcedure,
                    "vat_Mushak_6_6_GetPaged", colparameters, ref rows);
                return VAT_VDSCertificationsLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        

        public List<xrpt_MushakDetails_6_6> xRpt_vat_Mushak_6_6_GetByIssueId(Int32 ? SupplierId=null, Int64? IssueId =null)
        {
            try
            {
                var VAT_VDSCertificationsLst = new List<xrpt_MushakDetails_6_6>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@SupplierId", SupplierId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@IssueId", IssueId, DbType.Int64, ParameterDirection.Input),
                };
                VAT_VDSCertificationsLst = dbExecutor.FetchData<xrpt_MushakDetails_6_6>(CommandType.StoredProcedure,
                    "xRpt_vat_Mushak_6_6_GetByIssueId", colparameters);
                return VAT_VDSCertificationsLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<xrpt_VAT_VDS> GetVat_TDS_GetByTDSIssueId( Int32 VDSIssueId)
        {
            try
            {
                var VAT_VDSCertificationsLst = new List<xrpt_VAT_VDS>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@VDSIssueId", VDSIssueId, DbType.Int32, ParameterDirection.Input),
                };
                VAT_VDSCertificationsLst = dbExecutor.FetchData<xrpt_VAT_VDS>(CommandType.StoredProcedure,
                    "xRpt_Vat_VDS_GetByVDSIssueId", colparameters);
                return VAT_VDSCertificationsLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<VAT_VDSCertifications> pay_SupplierPayment_GetBySupplierIdForVDSIssue(string SupplierIds)
        {
            try
            {
                var VAT_VDSCertificationsLst = new List<VAT_VDSCertifications>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SupplierId", SupplierIds, DbType.String, ParameterDirection.Input),
                  
                };
                VAT_VDSCertificationsLst = dbExecutor.FetchData<VAT_VDSCertifications>(CommandType.StoredProcedure,
                    "pay_SupplierPayment_GetBySupplierIdForVDSIssue", colparameters);
                return VAT_VDSCertificationsLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public Int64 GetMaxSupplierVdsIssueNo()
        {
            try
            {

                Int64 reqNo = 0;

                dbExecutor.ManageTransaction(TransactionType.Open);
                reqNo = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "Vat_VDS_GetMaxVDSIssueNo", null, true);

                dbExecutor.ManageTransaction(TransactionType.Commit);
                return reqNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public Int64 vat_Mushak_6_6_GetMaxIssueNo()
        {
            try
            {

                Int64 reqNo = 0;

                dbExecutor.ManageTransaction(TransactionType.Open);
                reqNo = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "vat_Mushak_6_6_GetMaxIssueNo", null, true);

                dbExecutor.ManageTransaction(TransactionType.Commit);
                return reqNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}
