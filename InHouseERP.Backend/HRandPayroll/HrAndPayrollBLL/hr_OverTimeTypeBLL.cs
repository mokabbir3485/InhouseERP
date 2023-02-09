using System;
using System.Collections.Generic;
using HrAndPayrollDAL;
using HrAndPayrollEntity;

namespace HrAndPayrollBLL
{
    public class hr_OverTimeTypeBLL //: IDisposible
    {
        public hr_OverTimeTypeBLL()
        {
            //hr_OverTimeTypeDAO = hr_OverTimeType.GetInstanceThreadSafe;
            hr_OverTimeTypeDAO = new hr_OverTimeTypeDAO();
        }

        public hr_OverTimeTypeDAO hr_OverTimeTypeDAO { get; set; }

        public List<hr_OverTimeType> GetAll()
        {
            try
            {
                return hr_OverTimeTypeDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_OverTimeType> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return hr_OverTimeTypeDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_OverTimeType> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return hr_OverTimeTypeDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(hr_OverTimeType _hr_OverTimeType)
        {
            try
            {
                return hr_OverTimeTypeDAO.Add(_hr_OverTimeType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(hr_OverTimeType _hr_OverTimeType)
        {
            try
            {
                return hr_OverTimeTypeDAO.Update(_hr_OverTimeType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int overTimeTypeId)
        {
            try
            {
                return hr_OverTimeTypeDAO.Delete(overTimeTypeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}