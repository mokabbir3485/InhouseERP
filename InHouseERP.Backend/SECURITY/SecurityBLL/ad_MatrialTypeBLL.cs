using SecurityEntity.SECURITY.SecurityDAL;
using SecurityEntity.SECURITY.SecurityEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.SECURITY.SecurityBLL
{
   public class ad_MatrialTypeBLL
    {
        public ad_MatrialTypeBLL()
        {
            //ad_CompanyDAO = ad_Company.GetInstanceThreadSafe;
            _ad_MatrialType = new ad_MaterialTypeDAO();
        }

        public ad_MaterialTypeDAO _ad_MatrialType { get; set; }


        public int Post(ad_MaterialType _ad_MaterialType)
        {
            try
            {
                return _ad_MatrialType.Post(_ad_MaterialType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_MaterialType> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
         string sortOrder, ref int rows)
        {
            try
            {
                return _ad_MatrialType.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


       public List<ad_MaterialType> GetAll()
        {
            try
            {
                return _ad_MatrialType.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
