using SecurityEntity.SECURITY.SecurityDAL;
using SecurityEntity.SECURITY.SecurityEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.SECURITY.SecurityBLL
{
    public class ad_CancelProcessBLL
    {
        public ad_CancelProcessBLL()
        {
            //ad_CompanyDAO = ad_Company.GetInstanceThreadSafe;
            ad_CancelProcessDAO = new ad_CancelProcessDAO();
        }

        public ad_CancelProcessDAO ad_CancelProcessDAO { get; set; }


        public List<ad_CancelProcessScreen> GetAllScreen()
        {
            try
            {
                return ad_CancelProcessDAO.GetAllScreen();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
        public List<ad_CancelReason> GetAllReason()
        {
            try
            {
                return ad_CancelProcessDAO.GetAllReason();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ad_DocumentGet_ForCancelProcess> GetAllDocument(string DocumentTypeCode, int? CompanyId=null)
        {
            try
            {
                return ad_CancelProcessDAO.GetAllDocument(DocumentTypeCode, CompanyId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int CancelProcessCreate(ad_CancelProcess _ad_CancelProcess)
        {
            try
            {
                return ad_CancelProcessDAO.CancelProcessCreate(_ad_CancelProcess);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_CancelProcess> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
           string sortOrder, ref int rows)
        {
            try
            {
                return ad_CancelProcessDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
