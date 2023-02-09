using SecurityDAL;
using SecurityEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityBLL
{
    public class ad_AdvanceToEmployeeBLL
    {
        public ad_AdvanceToEmployeeBLL()
        {
            //ad_CompanyDAO = ad_Company.GetInstanceThreadSafe;
            ad_AdvanceToEmployeeDAO = new ad_AdvanceToEmployeeDAO();
        }

        public ad_AdvanceToEmployeeDAO ad_AdvanceToEmployeeDAO { get; set; }


        public Int64 GetAdvancePaymentMaxNo()
        {
            try
            {
                return ad_AdvanceToEmployeeDAO.GetAdvancePaymentMaxNo();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public long PostAdvanceToEmployee(ad_AdvanceToEmployee ad_AdvanceToEmployee)
        {
            try
            {
                return ad_AdvanceToEmployeeDAO.Post(ad_AdvanceToEmployee);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_AdvanceToEmployee> GetAdvanceToEmployeeGetPaged(int startRecordNo, int rowPerPage,
            string whereClause, string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return ad_AdvanceToEmployeeDAO.GetAdvanceToEmployeeGetPaged(startRecordNo, rowPerPage,
                    whereClause, sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_AdvanceToEmployee> GetDynamicAdvanceToEmployee(string whereCondition, string orderByExpression)
        {
            try
            {
                return ad_AdvanceToEmployeeDAO.GetDynamicAdvanceToEmployee(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
