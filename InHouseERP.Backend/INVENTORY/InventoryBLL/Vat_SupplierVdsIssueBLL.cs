using SecurityEntity.INVENTORY.InventoryDAL;
using SecurityEntity.INVENTORY.InventoryEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.INVENTORY.InventoryBLL
{
   public class Vat_SupplierVdsIssueBLL
    {

        public Vat_SupplierVdsIssueBLL()
        {
            //proc_ImportPurchaseBillDetailDAO = proc_ImportPurchaseBillDetail.GetInstanceThreadSafe;
            Vat_SupplierVdsIssueDAO = new Vat_SupplierVdsIssueDAO();
        }

        public Vat_SupplierVdsIssueDAO Vat_SupplierVdsIssueDAO { get; set; }
        public int Add(Vat_VDS _VAT_VDSCertifications)
        {
            try
            {
                return Vat_SupplierVdsIssueDAO.Add(_VAT_VDSCertifications);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int AddMushak6_6(vat_Mushak_6_6 vat_Mushak_6_6)
        {
            try
            {
                return Vat_SupplierVdsIssueDAO.AddMushak6_6(vat_Mushak_6_6);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int AddMushakDetails6_6(vat_MushakDetails_6_6 _MushakDetails_6_6)
        {
            try
            {
                return Vat_SupplierVdsIssueDAO.AddMushakDetails6_6(_MushakDetails_6_6);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int AddDetails(Vat_VDSDetail _VDSDetail)
        {
            try
            {
                return Vat_SupplierVdsIssueDAO.AddDetails(_VDSDetail);
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
                return Vat_SupplierVdsIssueDAO.Musuk_6_GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Vat_VDS> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
           string sortOrder, ref int rows)
        {
            try
            {
                return Vat_SupplierVdsIssueDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
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
                return Vat_SupplierVdsIssueDAO.GetMaxSupplierVdsIssueNo();
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
                return Vat_SupplierVdsIssueDAO.vat_Mushak_6_6_GetMaxIssueNo();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        

        public List<xrpt_MushakDetails_6_6> xRpt_vat_Mushak_6_6_GetByIssueId(Int32? SupplierId = null, Int64? IssueId = null)
        {
            try
            {
                return Vat_SupplierVdsIssueDAO.xRpt_vat_Mushak_6_6_GetByIssueId(SupplierId, IssueId);
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
                return Vat_SupplierVdsIssueDAO.pay_SupplierPayment_GetBySupplierIdForVDSIssue(SupplierIds);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<xrpt_VAT_VDS> GetVat_TDS_GetByTDSIssueId(Int32 VDSIssueId)
        {
            try
            {
                return Vat_SupplierVdsIssueDAO.GetVat_TDS_GetByTDSIssueId(VDSIssueId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }




    }
}
