interface CandidateDetailsCardProps {
  name?: string;
  applicationNumber?: string;
  rollNumber?: string;
  fatherName?: string;
  motherName?: string;
  phone?: string;
  altNo?: string;
  caste?: string;
  gender?: string;
  dob?: string;
}

const CandidateDetailsCard = ({
  name = "SHUBHAM SUNIL MANKAR",
  applicationNumber = "110378000000001",
  rollNumber = "110378000000001",
  fatherName = "SUNIL MANKAR",
  motherName = "SUNITA MANKAR",
  phone = "9763677201",
  altNo = "--",
  caste = "EWS",
  gender = "Male",
  dob = "24-02-2000",
}: CandidateDetailsCardProps) => {
  return (
    <div className="glass-card p-6 mb-6">
      <h3 className="text-sm font-semibold text-muted-foreground mb-4">Candidate Details</h3>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-[220px] h-[220px] rounded-2xl gradient-success flex items-center justify-center shadow-lg">
            <span className="text-white text-5xl font-bold">SSM</span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <div className="bg-white/50 backdrop-blur-md rounded-xl p-4 border border-white/40">
              <p className="text-2xl font-bold text-foreground">{name}</p>
            </div>
          </div>

          <div className="bg-white/50 backdrop-blur-md rounded-xl p-3 border border-white/40">
            <p className="text-xs text-muted-foreground">Application Number</p>
            <p className="text-sm font-semibold text-foreground">{applicationNumber}</p>
          </div>

          <div className="bg-white/50 backdrop-blur-md rounded-xl p-3 border border-white/40">
            <p className="text-xs text-muted-foreground">Roll Number</p>
            <p className="text-sm font-semibold text-foreground">{rollNumber}</p>
          </div>

          <div className="bg-white/50 backdrop-blur-md rounded-xl p-3 border border-white/40">
            <p className="text-xs text-muted-foreground">Father's Name</p>
            <p className="text-sm font-semibold text-foreground">{fatherName}</p>
          </div>

          <div className="bg-white/50 backdrop-blur-md rounded-xl p-3 border border-white/40">
            <p className="text-xs text-muted-foreground">Mother's Name</p>
            <p className="text-sm font-semibold text-foreground">{motherName}</p>
          </div>

          <div className="bg-white/50 backdrop-blur-md rounded-xl p-3 border border-white/40">
            <p className="text-xs text-muted-foreground">Phone No.</p>
            <p className="text-sm font-semibold text-foreground">{phone}</p>
          </div>

          <div className="bg-white/50 backdrop-blur-md rounded-xl p-3 border border-white/40">
            <p className="text-xs text-muted-foreground">Alt No.</p>
            <p className="text-sm font-semibold text-foreground">{altNo}</p>
          </div>

          <div className="bg-white/50 backdrop-blur-md rounded-xl p-3 border border-white/40">
            <p className="text-xs text-muted-foreground">Caste</p>
            <p className="text-sm font-semibold text-foreground">{caste}</p>
          </div>

          <div className="bg-white/50 backdrop-blur-md rounded-xl p-3 border border-white/40">
            <p className="text-xs text-muted-foreground">Gender</p>
            <p className="text-sm font-semibold text-foreground">{gender}</p>
          </div>

          <div className="bg-white/50 backdrop-blur-md rounded-xl p-3 border border-white/40">
            <p className="text-xs text-muted-foreground">Date of Birth</p>
            <p className="text-sm font-semibold text-foreground">{dob}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailsCard;
