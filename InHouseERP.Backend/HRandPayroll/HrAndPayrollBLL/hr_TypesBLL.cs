using System;
using System.Collections.Generic;
using HrAndPayrollDAL;
using HrAndPayrollEntity;

namespace HrAndPayrollBLL
{
    public class hr_TypesBLL //: IDisposible
    {
        public hr_TypesBLL()
        {
            //hr_TypesDAO = hr_Types.GetInstanceThreadSafe;
            hr_TypesDAO = new hr_TypesDAO();
        }

        public hr_TypesDAO hr_TypesDAO { get; set; }

        public List<hr_Types> GetAll()
        {
            try
            {
                return hr_TypesDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_Types> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return hr_TypesDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_Types> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return hr_TypesDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(hr_Types _hr_Types)
        {
            try
            {
                return hr_TypesDAO.Add(_hr_Types);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(hr_Types _hr_Types)
        {
            try
            {
                return hr_TypesDAO.Update(_hr_Types);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int typesId)
        {
            try
            {
                return hr_TypesDAO.Delete(typesId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}