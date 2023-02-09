using System;
using System.Collections.Generic;
using HrAndPayrollDAL;
using HrAndPayrollEntity;

namespace HrAndPayrollBLL
{
    public class hr_AllowanceTypeSetupBLL //: IDisposible
    {
        public hr_AllowanceTypeSetupBLL()
        {
            //hr_AllowanceTypeSetupDAO = hr_AllowanceTypeSetup.GetInstanceThreadSafe;
            hr_AllowanceTypeSetupDAO = new hr_AllowanceTypeSetupDAO();
        }

        public hr_AllowanceTypeSetupDAO hr_AllowanceTypeSetupDAO { get; set; }

        public List<hr_AllowanceTypeSetup> GetByGradeId(int gradeId)
        {
            try
            {
                return hr_AllowanceTypeSetupDAO.GetByGradeId(gradeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_AllowanceTypeSetup> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return hr_AllowanceTypeSetupDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_AllowanceTypeSetup> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return hr_AllowanceTypeSetupDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(hr_AllowanceTypeSetup _hr_AllowanceTypeSetup)
        {
            try
            {
                return hr_AllowanceTypeSetupDAO.Add(_hr_AllowanceTypeSetup);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(hr_AllowanceTypeSetup _hr_AllowanceTypeSetup)
        {
            try
            {
                return hr_AllowanceTypeSetupDAO.Update(_hr_AllowanceTypeSetup);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long allowanceTypeSetupId)
        {
            try
            {
                return hr_AllowanceTypeSetupDAO.Delete(allowanceTypeSetupId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}