using System;
using System.Collections.Generic;
using HrAndPayrollDAL;
using HrAndPayrollEntity;

namespace HrAndPayrollBLL
{
    public class hr_AttendancePolicyBLL //: IDisposible
    {
        public hr_AttendancePolicyBLL()
        {
            //hr_AttendancePolicyDAO = hr_AttendancePolicy.GetInstanceThreadSafe;
            hr_AttendancePolicyDAO = new hr_AttendancePolicyDAO();
        }

        public hr_AttendancePolicyDAO hr_AttendancePolicyDAO { get; set; }

        public List<hr_AttendancePolicy> GetAll()
        {
            try
            {
                return hr_AttendancePolicyDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_AttendancePolicy> GetByStartAndEndTime(string startTime, string endTime)
        {
            try
            {
                return hr_AttendancePolicyDAO.GetByStartAndEndTime(startTime, endTime);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_AttendancePolicy> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return hr_AttendancePolicyDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(hr_AttendancePolicy _hr_AttendancePolicy)
        {
            try
            {
                return hr_AttendancePolicyDAO.Add(_hr_AttendancePolicy);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(hr_AttendancePolicy _hr_AttendancePolicy)
        {
            try
            {
                return hr_AttendancePolicyDAO.Update(_hr_AttendancePolicy);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int attendancePolicyId)
        {
            try
            {
                return hr_AttendancePolicyDAO.Delete(attendancePolicyId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}