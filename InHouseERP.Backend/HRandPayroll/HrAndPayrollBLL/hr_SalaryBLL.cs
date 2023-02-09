using System;
using System.Collections.Generic;
using HrAndPayrollDAL;
using HrAndPayrollEntity;

namespace HrAndPayrollBLL
{
    public class hr_SalaryBLL //: IDisposible
    {
        public hr_SalaryBLL()
        {
            //hr_SalaryDAO = hr_Salary.GetInstanceThreadSafe;
            hr_SalaryDAO = new hr_SalaryDAO();
        }

        public hr_SalaryDAO hr_SalaryDAO { get; set; }

        public List<hr_Salary> GetForPrepare(int monthId, int yearId, int gradeId)
        {
            try
            {
                return hr_SalaryDAO.GetForPrepare(monthId, yearId, gradeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_Salary> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return hr_SalaryDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_Salary> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return hr_SalaryDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Post(hr_Salary _hr_Salary)
        {
            try
            {
                return hr_SalaryDAO.Post(_hr_Salary);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(hr_Salary _hr_Salary)
        {
            try
            {
                return hr_SalaryDAO.Update(_hr_Salary);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long salaryId)
        {
            try
            {
                return hr_SalaryDAO.Delete(salaryId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}