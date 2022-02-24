export default function Badge({className, children, variant='success', ...other}) {
    const cls = `badge bg-${variant} p-2 rounded`
    return (
      <span className={cls} {...other}>{children}</span>
    );
}