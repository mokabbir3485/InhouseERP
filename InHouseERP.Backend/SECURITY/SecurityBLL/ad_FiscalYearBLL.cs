using SecurityEntity.SECURITY.SecurityDAL;
using SecurityEntity.SECURITY.SecurityEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.SECURITY.SecurityBLL
{
   public class ad_FiscalYearBLL
    {

        public ad_FiscalYearBLL()
        {

            _ad_FiscalYearDAO = new ad_FiscalYearDAO();
        }

        public ad_FiscalYearDAO _ad_FiscalYearDAO { get; set; }



        public int Post(ad_FiscalYear _ad_FiscalYear)
        {
            try
            {
                return _ad_FiscalYearDAO.Post(_ad_FiscalYear);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<ad_FiscalYear> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,string sortOrder, ref int rows)
        {
            try
            {
                return _ad_FiscalYearDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<ad_FiscalYear> GetAll(Int32? FiscalYearId = null)
        {
            try
            {
                return _ad_FiscalYearDAO.GetAll(FiscalYearId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_FiscalYear> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return _ad_FiscalYearDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
