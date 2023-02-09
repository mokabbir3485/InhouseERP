using System;
using System.Collections.Generic;
using HrAndPayrollDAL;
using HrAndPayrollEntity;

namespace HrAndPayrollBLL
{
    public class hr_GradeBLL //: IDisposible
    {
        public hr_GradeBLL()
        {
            //hr_GradeDAO = hr_Grade.GetInstanceThreadSafe;
            hr_GradeDAO = new hr_GradeDAO();
        }

        public hr_GradeDAO hr_GradeDAO { get; set; }

        public List<hr_Grade> GetAll()
        {
            try
            {
                return hr_GradeDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_Grade> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return hr_GradeDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_Grade> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return hr_GradeDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(hr_Grade _hr_Grade)
        {
            try
            {
                return hr_GradeDAO.Add(_hr_Grade);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(hr_Grade _hr_Grade)
        {
            try
            {
                return hr_GradeDAO.Update(_hr_Grade);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int gradeId)
        {
            try
            {
                return hr_GradeDAO.Delete(gradeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}