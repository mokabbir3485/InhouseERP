using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_EmployeeBLL //: IDisposible
    {
        public ad_EmployeeBLL()
        {
            //ad_EmployeeDAO = ad_Employee.GetInstanceThreadSafe;
            ad_EmployeeDAO = new ad_EmployeeDAO();
        }

        public ad_EmployeeDAO ad_EmployeeDAO { get; set; }

        public List<ad_Employee> GetEmployeeByRefEmployeeId()
        {
            try
            {
                return ad_EmployeeDAO.GetEmployeeByRefEmployeeId();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Employee> GetAll()
        {
            try
            {
                return ad_EmployeeDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Employee> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return ad_EmployeeDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Employee> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return ad_EmployeeDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Employee> GetForShiftEntry(int branchId, DateTime from, DateTime to)
        {
            try
            {
                return ad_EmployeeDAO.GetForShiftEntry(branchId, from, to);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Employee> GetEmployeeEmailByDocumentRef(int refEmployeeId, int? PaymentProcessTypeId = null)
        {
            try
            {
                return ad_EmployeeDAO.GetEmployeeEmailByDocumentRef(refEmployeeId, PaymentProcessTypeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_Employee _ad_Employee)
        {
            try
            {
                return ad_EmployeeDAO.Add(_ad_Employee);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(ad_Employee _ad_Employee)
        {
            try
            {
                return ad_EmployeeDAO.Update(_ad_Employee);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int EmployeeId)
        {
            try
            {
                return ad_EmployeeDAO.Delete(EmployeeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}