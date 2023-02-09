using System;
using System.Collections.Generic;
using HrAndPayrollDAL;
using HrAndPayrollEntity;

namespace HrAndPayrollBLL
{
    public class hr_HolidayBLL //: IDisposible
    {
        public hr_HolidayBLL()
        {
            //hr_HolidayDAO = hr_Holiday.GetInstanceThreadSafe;
            hr_HolidayDAO = new hr_HolidayDAO();
        }

        public hr_HolidayDAO hr_HolidayDAO { get; set; }

        public List<hr_Holiday> GetAll()
        {
            try
            {
                return hr_HolidayDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_Holiday> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return hr_HolidayDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_Holiday> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return hr_HolidayDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(hr_Holiday _hr_Holiday)
        {
            try
            {
                return hr_HolidayDAO.Add(_hr_Holiday);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(hr_Holiday _hr_Holiday)
        {
            try
            {
                return hr_HolidayDAO.Update(_hr_Holiday);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int holidayId)
        {
            try
            {
                return hr_HolidayDAO.Delete(holidayId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}