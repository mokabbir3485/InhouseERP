using System;
using System.Collections.Generic;
using HrAndPayrollDAL;
using HrAndPayrollEntity;
using SecurityEntity.HRandPayroll.HrAndPayrollEntity;

namespace HrAndPayrollBLL
{
    public class hr_SalaryDetailBLL //: IDisposible
    {
        public hr_SalaryDetailBLL()
        {
            //hr_SalaryDetailDAO = hr_SalaryDetail.GetInstanceThreadSafe;
            hr_SalaryDetailDAO = new hr_SalaryDetailDAO();
        }

        public hr_SalaryDetailDAO hr_SalaryDetailDAO { get; set; }

        public List<hr_SalaryDetail> WagesSlipForHr(int MonthId, int YearId, int GradeId, string BranchName,
            string DepartmentIds, string SectionIds)
        {
            try
            {
                return hr_SalaryDetailDAO.WagesSlipForHr(MonthId, YearId, GradeId, BranchName, DepartmentIds,
                    SectionIds);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<hr_SalaryDetail> PaySlipForHr(int MonthId, int YearId, int GradeId, string BranchName,
            string DepartmentIds, string SectionIds)
        {
            try
            {
                return hr_SalaryDetailDAO.PaySlipForHr(MonthId, YearId, GradeId, BranchName, DepartmentIds,
                    SectionIds);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_SalaryDetail> GetForPrepare(int monthId, int yearId, int branchId, int gradeId,
            string departmentId, int sectionId)
        {
            try
            {
                return hr_SalaryDetailDAO.GetForPrepare(monthId, yearId, branchId, gradeId, departmentId, sectionId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
        public List<hr_SalaryDetailReport> GetAllSalaryDetail(int MonthId, int YearId, int GradeId, string BranchName,string UnitName, string DepartmentName, string Header1, string Header2, string Header3)
        {
            try
            {
                return hr_SalaryDetailDAO.GetAllSalaryDetail(MonthId, YearId, GradeId, BranchName, UnitName, DepartmentName, Header1, Header2, Header3);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<hr_SalaryHistory> GetAllSalaryhistory(int FromMonthYearId, int ToMonthYearId, int BranchId, int GradeId,
     int DepartmentId, int SectionId, int EmployeeId)
        {
            try
            {
                return hr_SalaryDetailDAO.GetAllSalaryhistory(FromMonthYearId, ToMonthYearId, BranchId, GradeId, DepartmentId, SectionId, EmployeeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_SalaryDetail> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return hr_SalaryDetailDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_SalaryDetail> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return hr_SalaryDetailDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Post(hr_SalaryDetail _hr_SalaryDetail)
        {
            try
            {
                return hr_SalaryDetailDAO.Post(_hr_SalaryDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(hr_SalaryDetail _hr_SalaryDetail)
        {
            try
            {
                return hr_SalaryDetailDAO.Update(_hr_SalaryDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long salaryDetailId)
        {
            try
            {
                return hr_SalaryDetailDAO.Delete(salaryDetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}