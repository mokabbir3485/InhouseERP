using System;
using System.Collections.Generic;
using HrAndPayrollDAL;
using HrAndPayrollEntity;

namespace HrAndPayrollBLL
{
    public class hr_BonusTypeSetupBLL //: IDisposible
    {
        public hr_BonusTypeSetupBLL()
        {
            //hr_BonusTypeSetupDAO = hr_BonusTypeSetup.GetInstanceThreadSafe;
            hr_BonusTypeSetupDAO = new hr_BonusTypeSetupDAO();
        }

        public hr_BonusTypeSetupDAO hr_BonusTypeSetupDAO { get; set; }

        public List<hr_BonusTypeSetup> GetByGradeId(int gradeId)
        {
            try
            {
                return hr_BonusTypeSetupDAO.GetByGradeId(gradeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_BonusTypeSetup> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return hr_BonusTypeSetupDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_BonusTypeSetup> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return hr_BonusTypeSetupDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(hr_BonusTypeSetup _hr_BonusTypeSetup)
        {
            try
            {
                return hr_BonusTypeSetupDAO.Add(_hr_BonusTypeSetup);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(hr_BonusTypeSetup _hr_BonusTypeSetup)
        {
            try
            {
                return hr_BonusTypeSetupDAO.Update(_hr_BonusTypeSetup);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long bonusTypeSetupId)
        {
            try
            {
                return hr_BonusTypeSetupDAO.Delete(bonusTypeSetupId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}