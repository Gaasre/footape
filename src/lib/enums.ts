export enum Position {
    Owner = 'Owner',
    Manager = 'Manager',
    ScriptWriter = 'Script Writer',
    VoiceOver = 'Voice Over',
    VideoEditor = 'Video Editor',
    ThumbnailDesigner = 'Thumbnail Designer'
}

export enum Section {
    Dashboard = 'Dashboard',
    Team = 'Team',
    Videos = 'Videos',
    Workflow = 'Workflow',
    Calendar = 'Calendar'
}

export enum Action {
    View = 'View',
    Edit = 'Edit',
    Delete = 'Delete',
    Add = 'Add'
}

export enum Status {
    Available = 'Available',
    InScripting = 'In Scripting',
    InVoiceOver = 'In Voice Over',
    InVideoEditing = 'In Video Editing',
    InQualityCheck = 'In Quality Check',
    ReadyForUpload = 'Ready For Upload',
    Published = 'Published'
}